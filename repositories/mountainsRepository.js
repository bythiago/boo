var { knex } = require("../index");
var qrcode = require("qrcode-generator");

function store(req, res) {
  knex("mountains")
    .insert(req.body)
    .then(() => {
      res.json(req.body);
    })
    .catch((err) => res.status(500).jsonp(err));
}

function all(req, res) {
  const q = req.query.q || "";

  knex("mountains")
    .select()
    .where("title", "like", `%${q}%`)
    .then((rows) => {
      resource(res, rows);
    });
}

function resource(res, rows) {
  res.json(
    rows.map((row) => {
      return {
        title: row.title,
        description: row.description,
        height: row.height,
        countries: row.countries,
        continent: row.continent,
        image: row.image,
        dir: row.dir,
        path: row.path,
        slug: row.slug,
        updatedAt: row.updatedAt,
        qrcode: createQrCode(row),
      };
    })
  );
}

function find(req, res) {
  knex("mountains")
    .select()
    .where("slug", req.params.slug)
    .then((rows) => {
      res.json(rows);
    });
}

function del(req, res) {
  knex("mountains")
    .where("slug", req.params.slug)
    .delete()
    .then(() => {
      res.json({ message: "Delete successfully", status: 200 });
    })
    .catch((err) => res.status(500).jsonp(err));
}

function update(req, res) {
  knex("mountains")
    .where("slug", req.params.slug)
    .update(req.body)
    .then(() => {
      res.json({ message: "Update successfully", status: 200 });
    })
    .catch((err) => res.status(500).jsonp(err));
}

function createQrCode(row) {
  try {
    var typeNumber = 4;
    var errorCorrectionLevel = "L";
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(`http://localhost:3000/${row.slug}`);
    qr.make();
    return qr.createDataURL();
  } catch (error) {
    return null;
  }
}

exports.store = store;
exports.all = all;
exports.find = find;
exports.del = del;
exports.update = update;
