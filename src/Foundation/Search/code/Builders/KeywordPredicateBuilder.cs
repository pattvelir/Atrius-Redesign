using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;
using Sitecore.ContentSearch.Linq;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.ContentSearch.SearchTypes;
using Velir.Search.Core.Attributes;
using Velir.Search.Core.Helpers;
using Velir.Search.Core.Predicates.Builders;
using Velir.Search.Core.Queries;
using Velir.Search.Core.Reference;

namespace Thread.Foundation.Search.Builders
{
	/// <summary>
	/// Accounts for changes in Sitecore's Solr Provider in 10.1. Multiword queries (e.g. "New Event") are currently failing in 10.1.
	/// See Release Notes: https://dev.sitecore.net/Downloads/Sitecore%20Experience%20Platform/101/Sitecore%20Experience%20Platform%20101/Release%20Notes
	/// Fix numbers: 177874, 206650
	/// See also: https://anbrue.net/2020/01/12/linqtosolr-using-matchwildcard-instead-of-contains/ (background on original defect that Sitecore fixed).
	///
	/// TODO Remove from solution when Velir.Search is modified to account for 10.1 behavior.
	/// </summary>
	/// <typeparam name="T"></typeparam>
	public class KeywordPredicateBuilder<T> : QueryPredicateBuilder<T> where T : SearchResultItem
	{
		private readonly IEnumerable<string> _values;
		private readonly ITypeHelper _typeHelper;

		public KeywordPredicateBuilder(IQueryFormatter queryFormatter, ISearchResultItemHelper itemHelper, IEnumerable<string> values, ITypeHelper typeHelper) : base(queryFormatter, itemHelper)
		{
			_values = values;
			_typeHelper = typeHelper;
		}

		public override Expression<Func<T, bool>> Build()
		{
			string query = _values.FirstOrDefault();

			if (string.IsNullOrEmpty(query)) return null;

			var predicate = PredicateBuilder.False<T>();

			if (HasAttribute(FieldType.Title))
			{
				predicate = predicate.Or(GetQueryExpression(FieldType.Title, query));
			}
			if (HasAttribute(FieldType.Description))
			{
				predicate = predicate.Or(GetQueryExpression(FieldType.Description, query));
			}

			if (HasAttribute(FieldType.Body))
			{
				predicate = predicate.Or(GetQueryExpression(FieldType.Body, query));
			}
			else if (QueryFormatter.NeedsFormatting(query) || !query.Contains(" "))
			{
				predicate = predicate.Or(x => x.Content.MatchWildcard(QueryFormatter.FormatQuery(query)));
			}
			else
			{
				int slop = (int) SiteSettings.MinimumSimilarity;
				predicate = predicate.Or(x => x.Content.Like(query, slop));
			}

			return predicate;
		}

		protected override Expression<Func<T, bool>> GetQueryExpression(FieldType fieldType, string query)
		{
			ParameterExpression expression = Expression.Parameter(typeof(T), "i");
			MemberExpression prop = Expression.Property(expression, typeof(T), ItemHelper.GetPropertyName<T>(fieldType));
			
			Expression like = QueryFormatter.NeedsFormatting(query) || !query.Contains(" ")
				? ItemHelper.GetMatchWildcardExpression(prop, QueryFormatter.FormatQuery(query))
				: GetLikeExpression(prop, query);
			float boost = ItemHelper.GetFieldBoost<T>(fieldType);
			var rightClause = boost > 0
				? ItemHelper.GetBoostExpression(like, boost)
				: like;

			return Expression.Lambda<Func<T, bool>>(rightClause, expression);
		}

		private Expression GetLikeExpression(Expression baseExpression, string query)
		{
			int slop = (int) SiteSettings.MinimumSimilarity;

			return (Expression) Expression.Call((Expression) null, GetLikeMethod(), new Expression[3]
			{
				baseExpression,
				(Expression) Expression.Constant((object) query),
				(Expression) Expression.Constant((object) slop)
			});
		}

		// Customized to ensure the "int" override is reached.  (float=> fuzzy syntax, int=> proximity syntax)
		public virtual MethodInfo GetLikeMethod()
		{
			return ((IEnumerable<MethodInfo>) _typeHelper.GetMethods(typeof (MethodExtensions))).First<MethodInfo>((Func<MethodInfo, bool>) (m =>
			{
				if (m.Name == "Like" && m.IsGenericMethod && m.GetParameters().Length == 3 &&
				    m.GetParameters()[2].ParameterType == typeof(int))
				{
					return true;
				}
				return false;
			})).MakeGenericMethod(typeof (string));
		}
	}
}