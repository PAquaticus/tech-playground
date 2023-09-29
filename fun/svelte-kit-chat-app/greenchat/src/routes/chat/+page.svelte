<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	let message: string = '';
	let messages: any[] = [];

	function sendMessage() {
		if (message.trim() !== '') {
			messages = messages.concat({
				text: message,
				timestamp: new Date()
			});

			message = '';
		}
	}
</script>

<div class="chat-container">
	<div class="messages">
		{#each messages as message (message.timestamp)}
			<div class="message">
				{message.text}
				<div class="time">{message.timestamp.toLocaleString()}</div>
			</div>
		{/each}
	</div>

	<div>
		<input bind:value={message} on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
		<button on:click={sendMessage}>Send</button>
	</div>
</div>

<style>
	.chat-container {
		display: flex;
		flex-direction: column;
		max-width: 500px;
		margin: auto;
		padding: 1em;
		box-sizing: border-box;
		background-color: black;
	}

	.messages {
		flex-grow: 1;
		overflow-y: auto;
		border: 1px solid #dfdfdf;
		padding: 1em;
		margin-bottom: 1em;
	}

	.message {
		margin-bottom: 0.6em;
		font-size: 0.9em;
		color: green;
	}

	.time {
		font-size: 0.8em;
		color: gray;
	}

	button {
		padding: 0.7em;
		border: 0;
		background: #5c6ac4;
		color: white;
		font-weight: bold;
		border-radius: 3px;
		cursor: pointer;
	}
</style>
