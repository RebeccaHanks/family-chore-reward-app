<script>
	let { data } = $props();
</script>

<h1>Parent dashboard</h1>
<p>Welcome, {data.parent.name}!</p>

<form method="POST" action="/logout">
	<button type="submit">Log out</button>
</form>