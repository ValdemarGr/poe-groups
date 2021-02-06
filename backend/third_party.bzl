load("@rules_jvm_external//:defs.bzl", "maven_install")
load("@rules_jvm_external//:specs.bzl", "maven", "parse")
load("//:scala_version.bzl", "artifact_version")

def _dependency(group, name, version):
    art = parse.parse_maven_coordinate(group + ":" + name + ":" + version)
    return maven.artifact(
        group =  art['group'],
        artifact = art['artifact'],
        packaging =  art.get('packaging'),
        classifier = art.get('classifier'),
        version =  art['version'],
        exclusions = None,
    )

def _scala_dependency(group, name, version):
    return _dependency(group, name + "_" + artifact_version, version)

deps = [
    _scala_dependency("org.typelevel", "cats-core", "2.1.1"),
    _scala_dependency("org.typelevel", "cats-effect", "2.1.1"),
    _scala_dependency("org.http4s", "http4s-dsl", "0.21.4"),
    _scala_dependency("org.http4s", "http4s-blaze-server", "0.21.4"),
    _scala_dependency("org.http4s", "http4s-circe", "0.21.4"),
    _scala_dependency("co.fs2", "fs2-core", "2.3.0"),
    _scala_dependency("io.circe", "circe-core", "0.13.0"),
    _scala_dependency("io.circe", "circe-parser", "0.13.0"),
    _scala_dependency("io.circe", "circe-generic", "0.13.0"),
    _scala_dependency("io.circe", "circe-generic-extras", "0.13.0"),
    _scala_dependency("org.tpolecat", "doobie-core", "0.9.2"),
    _scala_dependency("org.tpolecat", "doobie-postgres", "0.9.2"),
    _scala_dependency("org.tpolecat", "doobie-hikari", "0.9.2"),
    _scala_dependency("org.gnieh", "diffson-circe", "4.0.3"),
    _scala_dependency("dev.profunktor", "redis4cats-effects", "0.10.3"),
    _scala_dependency("com.github.ghostdogpr", "caliban", "0.9.4"),
    _scala_dependency("com.github.ghostdogpr", "caliban-http4s", "0.9.4"),
    _scala_dependency("com.github.ghostdogpr", "caliban-cats", "0.9.4"),
    _dependency("org.apache.poi", "poi", "4.1.2"),
]

def dependencies():
    maven_install(
        artifacts = deps,
        repositories = [
            "https://repo.maven.apache.org/maven2/",
            "https://mvnrepository.com/artifact",
            "https://maven-central.storage.googleapis.com",
        ],
        fetch_sources = True,
        generate_compat_repositories = True,
        #        maven_install_json = "//:maven_install.json",
    )
