import toast, { Toaster } from 'react-hot-toast';

export const notifyOk = dataLength =>
  toast(`Here are your ${dataLength} images.`);

export const notifyEnd = dataLength =>
  toast(`Search limit is reached! There are only ${dataLength} images.`);

export const Toast = () => (
  <Toaster
    position="bottom-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      // Define default options
      className: '',
      duration: 2000,
      style: {
        background: 'tomato',
        color: '#fff',
        fontSize: '26px',
      },

      // Default options for specific types
      success: {
        duration: 3000,
        theme: {
          primary: 'green',
          secondary: 'black',
        },
      },
    }}
  />
);
