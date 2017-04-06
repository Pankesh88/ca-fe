function searchUtil(item, toSearch) {
    /* Search Text in all 3 fields */
    return (item.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.capital.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.population.toString().toLowerCase().indexOf(toSearch.toLowerCase()) > -1) ? true : false;
}
