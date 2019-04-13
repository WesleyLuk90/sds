import { Panel } from "../models/Panel";
import { Collection, CollectionType } from "../storage/Collection";
import { Storage } from "../storage/Storage";
import { StorageService } from "../storage/StorageService";

const PanelCollection = new Collection(CollectionType.SYSTEM, "panels");

export class PanelService extends StorageService<Panel> {
    static async create(storage: Storage): Promise<PanelService> {
        const service = new PanelService(PanelCollection, storage);
        await service.initialize();
        return service;
    }
}
