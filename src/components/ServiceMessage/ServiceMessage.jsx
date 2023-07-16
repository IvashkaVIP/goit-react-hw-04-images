
export const ServiceMessage = ({ State }) => {
  const { isLoading, searchQuery, images } = State;
  // console.log('ServiceMes >>>>>   ',isLoading,' ', searchQuery,' ', images,'   ', Date.now());
  if (!isLoading && searchQuery && !images.length) {
    return (
      <h1
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#1500d3',
        }}
      >
        Sorry, no data available on request "{searchQuery}"
      </h1>
    );
  }
  if (!isLoading && !searchQuery) {
    return (
      <h1
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#1500d3',
        }}
      >
        Please enter an image search query
      </h1>
    );
  }
};

