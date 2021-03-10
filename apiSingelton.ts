import config     from './etc/config';
import apiFactory from '@api/index';

export default apiFactory(config.apiPrefix);
