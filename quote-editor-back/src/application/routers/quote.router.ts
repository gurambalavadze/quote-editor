import express from "express";
import { IQuoteController } from "../controllers/quote.ctrl";

const router = express.Router();

const quoteRouter = (quoteCtrl: IQuoteController) => {
  router.get("/", quoteCtrl.getAll);
  router.get("/:id", quoteCtrl.get);
  router.post("/", quoteCtrl.add);
  router.put("/:id", quoteCtrl.edit);
  router.delete("/:id", quoteCtrl.delete);

  return router;
};

export default quoteRouter;
