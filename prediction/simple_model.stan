data {
	int<lower=0> w;         // number of weeks to use for training the model
	int<lower=0> s;			// number of stations
	matrix D[s, 24*7*w*2];    // the recorded bike deltas for 2w weeks
}
transformed data {
	matrix means[s, 24*7];
	matrix vars[s, 24*7];

	for (i in 1:s) {
		for (j in 1:(24*7)) {
			real tmp[w];
			for (k in 0:(w-1)) {
				tmp[k+1] = D[i, k * 24 * 7 +j];
			}
			means[i, j] = mean(tmp);
			vars[i, j] = sd(tmp) * 0.9 + 0.2;
		}
	}
}
parameters {
	matrix B[s, 24*7];
}
transformed parameters {
}
model {
	to_vector(B) ~ normal(to_vector(means), to_vector(vars));
	for (i in (w+1):(w*2)) {
		to_vector(D[,i]) ~ normal(to_vector(B), to_vector(vars));
	}
}
