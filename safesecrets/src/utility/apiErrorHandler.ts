const handleApiResponse = async (resp: any) => {
  try {
    if (resp.url.includes('offline.html')) {
      return {
        errors: ['Server is offline'],
      };
    }
    const response = await resp.json();
    return response;
  } catch {
    const err = await resp.text();
    return err;
  }
};

export default handleApiResponse;
