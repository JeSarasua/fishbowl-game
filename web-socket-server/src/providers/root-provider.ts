import { GameRepository } from "../repositories/GameRepository";
import { WordRepository } from "../repositories/WordRepository";
import { ClientService } from "../services/ClientService";
import { GameService } from "../services/GameService";
import { WordService } from "../services/WordService";

export class RootProvider {
  private _wordRepository: WordRepository;
  private _wordService: WordService;
  private _gameRepository: GameRepository;
  private _gameService: GameService;
  private _clientService: ClientService;

  constructor() {
    this._wordRepository = new WordRepository();
    this._wordService = new WordService(this._wordRepository);
    this._gameRepository = new GameRepository();
    this._gameService = new GameService(
      this._gameRepository,
      this._wordService
    );
    this._clientService = new ClientService(this._gameService);
  }

  get wordRepository(): WordRepository {
    return this._wordRepository;
  }

  get wordService(): WordService {
    return this._wordService;
  }

  get gameRepository(): GameRepository {
    return this._gameRepository;
  }

  get gameService(): GameService {
    return this._gameService;
  }

  get clientService(): ClientService {
    return this._clientService;
  }
}

export const ROOT_PROVIDER = new RootProvider();
