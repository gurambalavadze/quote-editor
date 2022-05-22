import { IQuoteService } from "src/services/quote.service";
import { QuoteDTO, QuoteUpdateDTO } from "../dtos/quote.dto";
import { Request, Response } from "express";
import { dataToResponse, errorToResponse } from "../utils/mapper";
import { quoteEditSchema, quoteSchema } from "../schemas/quote.schema";

export interface IQuoteController {
  getAll(req: Request, res: Response): Promise<Response>;
  get(req: Request, res: Response): Promise<Response>;
  add(req: Request, res: Response): Promise<Response>;
  edit(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export class QuoteController implements IQuoteController {
  constructor(private quoteService: IQuoteService) {}

  getAll = async (_: Request, res: Response) => {
    try {
      const results = await this.quoteService.getAll();
      return res.json(dataToResponse(results));
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  get = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(errorToResponse("id", "id is required"));
      }
      const result = await this.quoteService.get(id);
      if (!result) {
        return res.status(404).json(errorToResponse("error", "Not found"));
      }

      return res.json(dataToResponse(result));
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
  add = async (req: Request, res: Response) => {
    try {
      const quoteDto: QuoteDTO = await quoteSchema.validate(req.body);

      try {
        const result = await this.quoteService.add(quoteDto);
        return res.json(dataToResponse(result));
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
    } catch (error: any) {
      return res.status(400).json(errorToResponse("error", error.message));
    }
  };
  edit = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(errorToResponse("id", "id is required"));
      }
      const quoteDto: QuoteUpdateDTO = await quoteEditSchema.validate(req.body);

      try {
        const result = await this.quoteService.update(id, quoteDto);
        return res.json(dataToResponse(result));
      } catch (error) {
        if (error.message === "invalid version") {
          return res
            .status(400)
            .json(errorToResponse("_v", "outdated version"));
        }
        if (error.message === "Entity not exists") {
          return res.sendStatus(404);
        }
        console.log(error);
        return res.sendStatus(500);
      }
    } catch (error) {
      return res.status(400).json(errorToResponse("error", error.message));
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json(errorToResponse("id", "id is required"));
      }

      const result = await this.quoteService.delete(id);
      return res.json({ result });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  };
}
