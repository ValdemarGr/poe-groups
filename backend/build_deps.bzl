load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def build_deps():
    if not native.existing_rule("rules_jvm_external"):
        RULES_JVM_EXTERNAL_TAG = "3.3"

        RULES_JVM_EXTERNAL_SHA = "d85951a92c0908c80bd8551002d66cb23c3434409c814179c0ff026b53544dab"

        http_archive(
            name = "rules_jvm_external",
            sha256 = RULES_JVM_EXTERNAL_SHA,
            strip_prefix = "rules_jvm_external-%s" % RULES_JVM_EXTERNAL_TAG,
            url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % RULES_JVM_EXTERNAL_TAG,
        )

    if not native.existing_rule("bazel_skylib"):
        skylib_version = "0.8.0"

        http_archive(
            name = "bazel_skylib",
            sha256 = "2ef429f5d7ce7111263289644d233707dba35e39696377ebab8b0bc701f7818e",
            type = "tar.gz",
            url = "https://github.com/bazelbuild/bazel-skylib/releases/download/{}/bazel-skylib.{}.tar.gz".format(skylib_version, skylib_version),
        )


    if not native.existing_rule("io_bazel_rules_scala"):
        rules_scala_version = "725b00465b83b776b5ad22eada026c3546df635c"  # update this as needed

        http_archive(
            name = "io_bazel_rules_scala",
            sha256 = "0a1189d4701e35d962a07baf4016f899588133ce39dd1f2f7fe9a8d8e515156e",
            strip_prefix = "rules_scala-%s" % rules_scala_version,
            type = "zip",
            url = "https://github.com/bazelbuild/rules_scala/archive/%s.zip" % rules_scala_version,
        )

