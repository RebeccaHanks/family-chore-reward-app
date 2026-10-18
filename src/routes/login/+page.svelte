<script>
	let { form } = $props();
</script>

<h1>Parent login</h1>

{#if form?.error}
	<p role="alert">{form.error}</p>
{/if}


<form method="POST">
	<label>
		Email
		<input type="email" name="email" autocomplete="email" required />
	</label>

	<label>
		Password
		<input
			type="password"
			name="password"
			autocomplete="current-password"
			required
		/>
	</label>

	<button type="submit">Log in</button>
</form>