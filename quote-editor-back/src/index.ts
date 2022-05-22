import "dotenv-safe/config";
import createApp from "./application/app";
import { MongoClient } from "mongodb";
import fs from "fs";
import { QuoteRepository } from "./repositories/quote.repo";
import { QuoteService } from "./services/quote.service";
import { QuoteEntity } from "./entities/quote.entity";

let uri = process.env.DATABASE_URL!;
if (process.env.DATABASE_PASS_FILE) {
  const dbpass = fs
    .readFileSync(process.env.DATABASE_PASS_FILE, "utf8")
    .trimEnd();
  uri = uri.replace("$password", dbpass);
}

const client = new MongoClient(uri);

const main = async () => {
  await client.connect();
  const db = client.db(process.env.DATABASE_NAME);
  const quoteCollection = db.collection<QuoteEntity>(
    process.env.DATABASE_QUOTE_COLLECTION!
  );

  const quoteRepo = new QuoteRepository(quoteCollection);
  const quoteService = new QuoteService(quoteRepo);

  await createApp(parseInt(process.env.PORT!), { services: { quoteService } });
};

main();
