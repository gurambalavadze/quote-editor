import express from "express";
import cors from "cors";
import quoteRouter from "./routers/quote.router";
import { IQuoteService } from "src/services/quote.service";
import { QuoteController } from "./controllers/quote.ctrl";

interface AppOptions {
  services: {
    quoteService: IQuoteService;
  };
}

const createApp = async (port: number, options: AppOptions) => {
  const app = express();

  const corsHost = process.env.CORS_CLIENT_HOST;
  if (corsHost) {
    app.use(
      cors({
        origin: corsHost,
        credentials: true,
      })
    );
  }
  app.use(express.json());

  const quoteCtrl = new QuoteController(options.services.quoteService);

  app.use("/quotes", quoteRouter(quoteCtrl));

  app.listen(port, () => {
    console.log("server listens on ", port);
  });

  return app;
};
export default createApp;
