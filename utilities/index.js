import invModel from "../models/inventory-model.js";
const Util = {};

Util.getNav = async function () {
  let data = await invModel.getClassifications();
  let list = '<li><a href="/" title="Home page">Home</a></li>';

  let rows = data.rows ? data.rows : data;

  if (Array.isArray(rows)) {
    rows.forEach((row) => {
      list += `<li><a href="/inv/type/${row.classification_id}" title="See our ${row.classification_name}">${row.classification_name}</a></li>`;
    });
  }

  return list;
};

export default Util;
