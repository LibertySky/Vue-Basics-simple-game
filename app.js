function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
		};
	},
	computed: {
		monsterBarHealth() {
			if (this.monsterHealth < 0) {
				return { width: '0%' };
			}
			return { width: this.monsterHealth + '%' };
		},
		playerBarHealth() {
			if (this.playerHealth < 0) {
				return { width: '0%' };
			}
			return { width: this.playerHealth + '%' };
		},
		mayUseSpecialAttack() {
			return this.currentRound % 3 !== 0;
		},
	},
	methods: {
		attackMonster() {
			this.currentRound++;
			const attackValue = randomValue(1, 10);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = randomValue(5, 12);
			this.playerHealth -= attackValue;
		},
		specialAttackMonster() {
			this.currentRound++;
			const attackValue = randomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
		},
		healPlayer() {
			this.currentRound++;
			const healValue = randomValue(10, 20);
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
				this.attackPlayer();
			}
		},
		startNewGame() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.currentRound = 0;
			this.winner = null;
		},
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				//A Draw
				this.winner = 'draw';
			} else if (value <= 0) {
				// Player lost
				this.winner = 'player';
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				//A Draw
				this.winner = 'draw';
			} else if (value <= 0) {
				// Monster lost
				this.winner = 'monster';
			}
		},
	},
});
app.mount('#game');
