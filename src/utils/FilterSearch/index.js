export const filterByQuery = (items, query, keys) => {
    if (!query) return items;
    if (!Array.isArray(keys) || keys.length === 0) return items;
  
    const lowerCaseQuery = String(query).toLowerCase();
  
    return items.filter((item) =>
      keys.some((key) => {
        // Resolve nested keys dynamically
        const value = key.split('.').reduce((obj, prop) => obj?.[prop], item);
        return value?.toString().toLowerCase().includes(lowerCaseQuery);
      })
    );
  };
  