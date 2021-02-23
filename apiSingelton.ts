import config     from './etc/config';
import apiFactory from '@/api';

export default apiFactory(config.apiPrefix);
