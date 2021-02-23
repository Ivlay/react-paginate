interface IRequest<S> {
    requestURL : string;
    method     : TMethods;
    payload?   : S;
    headers?   : S;
};

type TMethods = 'GET';

export default class ApiClient {
    static prefix : string;
    
    constructor(prefix = '') {
        ApiClient.prefix = prefix
    };

    static CONTENT_TYPES = {
        'JSON' : 'application/json; charset=utf-8'
    };

    private async request<T, S> ({ requestURL, method }: IRequest<S>): Promise<{totalCount: string, data: T}> {
        const headers: HeadersInit = this.getHeadersByMethod(method);
        const options: RequestInit = { method, headers};
        const url                  = this.getUrl(requestURL);

        const resp = await this.fetch(url, options, 2);

        const totalCount = resp.headers.get('x-total-count');

        if (!resp.ok) throw new Error('Something wrong');

        const parsedResp: T = await resp.json();

        return { totalCount, data: parsedResp };
    };

    private async fetch(url: string, options: RequestInit, attempts = 2): Promise<Response> {
        for (let i = 0; i < attempts; i++) {
            try {
                return await fetch(url, options);
            } catch (error) {
                console.error(error);
            }
        };
    };

    get = <T>({ requestURL }: { requestURL: string }): Promise<{totalCount: string, data: T}> => {
        return this.request({
            method: 'GET',
            requestURL
        });
    };

    private getHeadersByMethod(method: TMethods): HeadersInit {
        return {
            'Content-Type' : this.getContentTypeByMethod(method)
        }
    };

    private getContentTypeByMethod (method: TMethods): string {
        if (method === 'GET') return ApiClient.CONTENT_TYPES.JSON;
    };

    private getUrl(url: string): string {
        return `${ApiClient.prefix}/${url}`;
    };
};
