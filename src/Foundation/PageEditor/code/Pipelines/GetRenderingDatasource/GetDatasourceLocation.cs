using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Text;
using System;
using Sitecore.Pipelines.GetRenderingDatasource;

namespace Thread.Foundation.PageEditor.Pipelines.GetRenderingDatasource
{
    public class GetDatasourceLocation
    {
        //9.2 broke relative path logic so using old logic from 9.1
        public void Process(GetRenderingDatasourceArgs args)
        {
            Assert.IsNotNull((object)args, nameof(args));
            foreach (string str in new ListString(args.RenderingItem["Datasource Location"]))
            {
                if (str.StartsWith("query:", StringComparison.InvariantCulture))
                {
                    this.AddRootsFromQuery(str.Substring("query:".Length), args);
                }
                else
                {
                    string path = str;
                    if (str.StartsWith("./", StringComparison.InvariantCulture) && !string.IsNullOrEmpty(args.ContextItemPath))
                        path = args.ContextItemPath + str.Remove(0, 1);
                    Item obj = args.ContentDatabase.GetItem(path);
                    if (obj != null)
                        args.DatasourceRoots.Add(obj);
                }
            }
        }

        protected virtual void AddRootsFromQuery(string query, GetRenderingDatasourceArgs args)
        {
            Assert.ArgumentNotNull((object)args, nameof(args));
            Assert.ArgumentNotNullOrEmpty(query, nameof(query));
            Item[] objArray = (Item[])null;
            if (query.StartsWith("./", StringComparison.InvariantCulture) && !string.IsNullOrEmpty(args.ContextItemPath))
            {
                Item obj = args.ContentDatabase.GetItem(args.ContextItemPath);
                if (obj != null)
                    objArray = obj.Axes.SelectItems(query);
            }
            else
                objArray = args.ContentDatabase.SelectItems(query);
            if (objArray == null)
                return;
            foreach (Item obj in objArray)
                args.DatasourceRoots.Add(obj);
        }
    }
}