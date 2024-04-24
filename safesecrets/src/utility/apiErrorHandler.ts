const handleApiResponse = async (resp: any) => {
  try {
    if (resp.url.includes('offline.html')) {
      return {
        errors: ['Server is offline'],
      };
    }
    if (resp.headers.get('content-type').includes('application/json')) {
      const response = await resp.json();
      return response;
    }
    const response = await resp.text();
    return response;
  } catch {
    const err = await resp.text();
    return err;
  }
};

export default handleApiResponse;
