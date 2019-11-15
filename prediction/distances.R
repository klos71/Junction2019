

id_permutations <- function(df1, df2) {
	list(do.call(rbind, lapply(df1$id, function(id) {
		data.frame(id1=id, id2=df1$id[df1$id != id])
	})), df2)
}

