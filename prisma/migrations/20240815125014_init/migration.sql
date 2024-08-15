-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "categories" TEXT[],
    "rating" INTEGER NOT NULL,
    "rating_count" INTEGER NOT NULL,
    "rating_average" INTEGER NOT NULL,
    "launch_year" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "age_limited" INTEGER NOT NULL,
    "banner_url" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "born_date" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Actors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActorsToMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActorsToMovies_AB_unique" ON "_ActorsToMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorsToMovies_B_index" ON "_ActorsToMovies"("B");

-- AddForeignKey
ALTER TABLE "_ActorsToMovies" ADD CONSTRAINT "_ActorsToMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Actors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorsToMovies" ADD CONSTRAINT "_ActorsToMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
