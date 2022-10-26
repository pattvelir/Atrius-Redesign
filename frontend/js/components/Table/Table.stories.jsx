import React from "react";
import ContainerFull from "../Container/ContainerFull.jsx";

export default {
  title: "Base/Table",
};

export const table = () => (
  <ContainerFull>
    <table>
      <thead>
        <tr>
          <th>Galluss</th>
          <th>Ecce</th>
          <th>Uria Mons</th>
          <th>Musas tolerare</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sunt hydraes transferre alter</td>
          <td>Mare. A falsis. </td>
          <td>Aususs peregrination.</td>
          <td>Mensas favere in cubiculum</td>
        </tr>
        <tr>
          <td>Lixa grandis cacula est.</td>
          <td>Nunquam consumere cedrium.</td>
          <td>Guttuss favere.</td>
          <td>Est ferox fiscina, cesaris.</td>
        </tr>
        <tr>
          <td>Ubi est barbatus brabeuta.</td>
          <td>Cur xiphias credere.</td>
          <td>Stellas velum.</td>
          <td>Ubi est regius sectam.</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">Cur rumor accelerare?</td>
        </tr>
      </tfoot>
      <caption>
        Grandis, teres danistas grauiter fallere de bi-color, primus eleates.
      </caption>
    </table>
  </ContainerFull>
);
