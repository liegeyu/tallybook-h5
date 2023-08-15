const MODE = import.meta.env.MODE;

export const baseUrl = MODE == 'development' ? '/api' : 'http://8.134.112.129:5573';