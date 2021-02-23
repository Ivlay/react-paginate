import {
    QueryClientProvider,
    QueryClient
} from 'react-query';

import { render }             from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import App                    from './App';

const queryClient = new QueryClient();

render(
    <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
        <App />
    </QueryClientProvider>,
    document.getElementById('root')
);
