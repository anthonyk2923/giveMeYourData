<script>
	let data = "";
	const token =
		"e6bd0e07c1abc6789b317f745a22a809f1a732b703b9225c5b289252970b837da8ada5ec1baf7a38c0e69f0211b6c095c38c82c5b7794fac24d701f2ccdfe6a8";
	const submit = () => {
		const uri = "https://hastebin.com/documents";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "text/plain",
				Authorization: `Bearer ${token}`,
			},
			body: data,
		};
		fetch(uri, options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				const link = `https://hastebin.com/share/${json.key}`;
				window.open(link, "_blank").focus();
				return link;
			})
			.then((link) => {
				fetch("http://localhost:8080/", {
					method: "POST",
					headers: {
						"Content-Type":
							"application/json",
					},
					body: JSON.stringify({ link: link }),
				}).then((data) => console.log(data));
			})
			.catch((err) => console.error(err));
	};
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<h1 class="text-7xl font-bold">Data Donation</h1>
	<h3 class="text-xl">Give me your free data so i can sell it</h3>
	<textarea
		name="data"
		id="data"
		class="p-4 resize bg-gray-100"
		rows="15"
		maxlength="1000"
		cols="50"
		bind:value={data}
	></textarea>
	<button
		on:click={submit}
		class="bg-slate-900 w-32 h-12 rounded mt-5 text-white cursor-pointer"
		>Send!</button
	>
</div>
