function send(e) {
    e.preventDefault();
    fetch("https://mockbin.com/request", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: document.getElementById("value").value})
    })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        document
          .getElementById("result")
          .innerText = value.postData.text;
    });
  }
  
  //handle submit event
  document.getElementById("form").addEventListener("submit", send);  