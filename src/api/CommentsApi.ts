import ApiClient from './ApiClient';

export interface IComments {
    postId : number;
    id     : number;
    name   : string;
    email  : string;
    body   : string;
};

interface IResponseComments {
    totalCount : string;
    data       : IComments[];
};

export default class CommentsApi {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    };
    /**
     * Load 50 comments by default.
     * The total number of comments is passed to res header `x-total-count`
     */
    loadComments = async (count = 5): Promise<IResponseComments> => {
        return this.apiClient.get({
            requestURL: `comments?_start=${count ? count : ''}0&_limit=50`
        });
    };
};
