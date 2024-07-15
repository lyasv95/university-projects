from py2neo import Graph, Node, Relationship


uri = "bolt://localhost:7687"
username = "neo4j"
password = "password"

graph = Graph("bolt://localhost:7687", auth=(username, password))

datasets = ["dataset25", "dataset50", "dataset75", "dataset100"]
for dataset in datasets:
    graph.run(f"CREATE DATABASE {dataset}").consume()
graph.close()