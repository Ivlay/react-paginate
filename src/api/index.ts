import ApiClient   from './ApiClient';
import CommentsApi from './CommentsApi';

const apiFactory = (prefix = '') => {
    if (!prefix) throw new Error('[apiPrefix] required');

    const apiClient = new ApiClient(prefix);

    const comments = new CommentsApi(apiClient);

    return {
        comments
    };
};

export default apiFactory;
