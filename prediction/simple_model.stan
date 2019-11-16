data {
	int<lower=0> w;         // number of weeks to use for training the model
	int<lower=0> s;			// number of stations
	matrix[s, 24*7*w*2] D;  // the recorded bike deltas for 2w weeks
	matrix[s, 24*7] means;  // the recorded bike deltas for 2w weeks
	matrix[s, 24*7] vars;  // the recorded bike deltas for 2w weeks
}
transformed data {
}
parameters {
	matrix[s, 24*7] B;
}
transformed parameters {
}
model {
	to_vector(B) ~ normal(to_vector(means), to_vector(vars));
	for (i in (w+1):(w*2)) {
		to_vector(D[,i]) ~ normal(to_vector(B), to_vector(vars));
	}
}
