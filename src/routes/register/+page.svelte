<script>
	let { form } = $props();
</script>
<h1>Create a parent account</h1>

{#if form?.error}
	<p role="alert">{form.error}</p>
{/if}

{#if form?.success}
	<p>Your account has been created.</p>
{/if}

<form method="POST">
	<label>
		Name
		<input name="name" autocomplete="name" required />
	</label>

	<label>
		Email
		<input type="email" name="email" autocomplete="email" required />
	</label>

	<label>
		Password
		<input
			type="password"
			name="password"
			autocomplete="new-password"
			minlength="8"
			required
		/>
	</label>

	<button type="submit">Create account</button>
</form>