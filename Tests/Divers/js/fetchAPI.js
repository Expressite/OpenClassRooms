fetch("https://mockbin.com/request?q=bonjour")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {      
    console.log(value.queryString);
    setInnerText("url", value.url);
    setInnerText("query", value.queryString.q);
  })
  .catch(function(err) {
    console.log("Erreur " + err);
  });

  /**
   * Set innerHTML value
   * @param {element id} elId 
   * @param {value to set} value 
   */
  function setInnerText(elId, value){
    document
    .getElementById(elId).innerText = value;
  }