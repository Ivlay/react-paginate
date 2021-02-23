import ApiClient from './ApiClient';

export interface IComments {
    postId : number;
    id     : number;
    name   : string;
    email  : string;
    body   : string;
};

export default class CommentsApi {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    };

    loadComments = async (count = 1): Promise<{totalCount: string, data: IComments[]}> => {
        return this.apiClient.get({
            requestURL: `comments?_start=${count ? count : ''}0&_limit=50`
        });
    };
};
