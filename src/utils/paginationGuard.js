const paginationGuard = (input) => {
    const defaults = { page: 1, size: 10 };
    const page = Math.max(1, parseInt(input.page)) || defaults.page;
    let size = parseInt(input.size) || defaults.size;
    size = Math.min(20, Math.max(1, size));
    
    return { 
      page, 
      size,
      skip: (page - 1) * size
    };
  };
  
  module.exports = paginationGuard;