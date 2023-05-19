import ContextStrategy from "./base/contextStrategy.js"
import MongoDBStrategy from "./strategies/mongoDBStrategy.js"
import PostgresDBStrategy from "./strategies/postgresStrategy.js"

const postgresConnectionString =
  "postgres://lucasand:test123@localhost:5432/heroes"
const postgresContext = new ContextStrategy(
  new PostgresDBStrategy(postgresConnectionString)
)
await postgresContext.connect()

const mongoDBconnectionString =
  "mongodb://lucasand:senhaadm@localhost:27017/heroes"

const mongoDBContext = new ContextStrategy(
  new MongoDBStrategy(mongoDBconnectionString)
)

await mongoDBContext.connect()

const data = [
  {
    name: "lucasAndrade",
    type: "transaction",
  },
  {
    name: "erickWendel",
    type: "activityLog",
  },
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
}

for (const { name, type } of data) {
  const context = contextTypes[type]
  await context.create({ name: name + Date.now() })

  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}
