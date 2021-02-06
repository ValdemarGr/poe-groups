package poegroups

import cats.effect._
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s._
import org.http4s.implicits._
import org.http4s.dsl.io._
import org.http4s.server.Router
import io.circe.JsonObject
import fs2.{Pipe, Stream}
import org.http4s.websocket.WebSocketFrame
import fs2.concurrent.Queue
import org.http4s.server.websocket.WebSocketBuilder
import diffson.circe._
import diffson.lcs._
import diffson._
import diffson.jsonpatch._
import diffson.jsonpatch.lcsdiff._
import scala.collection.concurrent.TrieMap
import java.{util => ju}
import doobie._
import doobie.implicits._
import doobie.hikari._
import io.circe._
import io.circe.parser._

import cats.data._
import cats._
import cats.implicits._
import scala.util.Try
import cats.effect.concurrent.Ref
import cats.effect.concurrent.Semaphore
import org.http4s.circe._
import org.http4s.server.middleware._

object Main extends IOApp {
  implicit val runtime = zio.Runtime.default

  val transactor =
    for {
      ce <- ExecutionContexts.fixedThreadPool[IO](4)
      be <- Blocker[IO]
      xa <- HikariTransactor.newHikariTransactor[IO](
        "org.postgresql.Driver",
        "jdbc:postgresql:wstest",
        "postgres",
        "1234",
        ce,
        be
      )
    } yield xa

  def run(args: List[String]): IO[ExitCode] =
    IO(println("hello")) *> IO.pure(ExitCode.Success)
}
