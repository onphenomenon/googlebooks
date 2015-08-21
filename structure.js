Profile in controller  { provider: 'google',
  id: '108574360675275690334',
  displayName: 'Karianne Burns',
  name: { familyName: 'Burns', givenName: 'Karianne' },
  photos: [ { value: 'https://lh6.googleusercontent.com/-JTX59NRjTE8/AAAAAAAAAAI/AAAAAAAACfI/3cRgtCnd27Y/photo.jpg?sz=50' } ],
  gender: 'female',


index req.user  { provider: 'google',
  id: '108574360675275690334',
  displayName: 'Karianne Burns',
  name: { familyName: 'Burns', givenName: 'Karianne' },
  photos: [ { value: 'https://lh6.googleusercontent.com/-JTX59NRjTE8/AAAAAAAAAAI/AAAAAAAACfI/3cRgtCnd27Y/photo.jpg?sz=50' } ],
  gender: 'female',
<a href="/auth/google/<%= lists[i].attributes.list_id %>">

<div class="row">
  <div class="col-sm-4">
    <form action="newList" method="post">
      <label for="list"><h4> Create New List </h4></label>
      <input id="list" type="text" name="list">
      <input type="submit" value="Save">
    </form>
    <!-- <p>Must be signed in.</p> -->
    <a href="/auth/google/lists">MY LISTS</a>

 <!--      <div id="navcontainer">
        <ul id="navlist">
          <li id="active"><a href="#" id="current">Item one</a>
            <ul id="subnavlist">
              <li id="subactive"><a href="#" id="subcurrent">Subitem one</a></li>
              <li><a href="#">Subitem two</a></li>
              <li><a href="#">Subitem three</a></li>
              <li><a href="#">Subitem four</a></li>
            </ul>
          </li>
          <li><a href="#">Item two</a></li>
          <li><a href="#">Item three</a></li>
          <li><a href="#">Item four</a></li>
        </ul>
      </div> -->

    <ul class="list-unstyled">
      <% if (!lists) { %>
        <li ><a href="#"><h5>NO Lists!</h5></a></li>
      <% } else { %>
        <% for(var i = 0; i < lists.length; i++) {%>
        <li ><a href="/auth/google/<%= lists[i].attributes.list_id %>"><h5><%= lists[i].attributes.name %></h5></a></li>
        <% } %>
      <% } %>
    </ul>
  </div>
  <div class="col-sm-4">

    <!-- <h4>BOOKS</h4>
    <ul class="list-unstyled">
      <% if (!books) { %>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#"><h5>NO Books!</h5></a></li>
      <% } else { %>
        <% for(var i = 0; i < books.length; i++) {%>

        <li role="presentation"><a role="menuitem" tabindex="-1" ><h5><%= books[i].attributes.name %></h5></a></li>
        <% } %>
      <% } %>
    </ul> -->

  </div>
  <div class="col-sm-4">
    <form onsubmit="booksearch(this.query.value); return false;"
              method="get">
        <label for="list"><h4> Search for Books </h4></label>
        <input type="text" size="30" name="query" value="Pride and Prejudice"/>
        <input type="submit" value="Go!"/>
    </form>
    <div>
      <ul id="results">
      </ul>
    </div>
  </div>
