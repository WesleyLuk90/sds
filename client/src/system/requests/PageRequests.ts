import { gql, GraphQlClient } from "../../http/GraphQlClient";
import { InputDocument, InputPage } from "../../__generated__/globalTypes";
import {
    CreateDocument,
    CreateDocumentVariables
} from "./__generated__/CreateDocument";
import { ListPages, ListPages_pages } from "./__generated__/ListPages";
import { GetPage, GetPageVariables } from "./__generated__/GetPage";
import { CreatePageVariables, CreatePage } from "./__generated__/CreatePage";
import { UpdatePageVariables, UpdatePage } from "./__generated__/UpdatePage";

export const PageSchema = gql`
    fragment PageSchema on Page {
        id
        panels {
            id
            name
            controls {
                type
                fieldId
            }
        }
    }
`;

const getQuery =
    gql`
        query GetPage($id: String!) {
            page(id: $id) {
                ...PageSchema
            }
        }
    ` + PageSchema;

const listQuery =
    gql`
        query ListPages {
            pages {
                ...PageSchema
            }
        }
    ` + PageSchema;

const createQuery =
    gql`
        mutation CreatePage($page: InputPage!) {
            createPage(page: $page) {
                ...PageSchema
            }
        }
    ` + PageSchema;

const updateQuery =
    gql`
        mutation UpdatePage($page: InputPage!) {
            updatePage(page: $page) {
                ...PageSchema
            }
        }
    ` + PageSchema;

export type Page = ListPages_pages;

export class PageRequests {
    static async list(): Promise<Page> {
        return (await GraphQlClient.query<ListPages>(listQuery)).pages;
    }

    static async get(id: string): Promise<Page> {
        const args: GetPageVariables = {
            id: id
        };
        return (await GraphQlClient.query<GetPage>(getQuery, args)).page;
    }

    static async create(page: InputPage): Promise<Page> {
        const args: CreatePageVariables = {
            page
        };
        const res = await GraphQlClient.query<CreatePage>(createQuery, args);
        return res.createPage;
    }

    static async update(page: InputPage): Promise<Page> {
        const args: UpdatePageVariables = {
            page
        };
        const res = await GraphQlClient.query<UpdatePage>(updateQuery, args);
        return res.updatePage;
    }
}
