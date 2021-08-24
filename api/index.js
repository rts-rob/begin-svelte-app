let fauna = require('faunadb'),
  q = fauna.query;

let client = new fauna.Client({
  secret: process.env.FAUNA_SECRET,
  domain: process.env.FAUNA_DOMAIN || 'db.fauna.com',
});

exports.handler = async function http (req) {
  console.log('Begin API called')
  let message = await client.query(
    q.Call(
      "get-message",
      "Begin"
    )
  );

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: JSON.stringify({
      msg: message
    })
  }
}
