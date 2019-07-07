INSERT INTO question (id, text) VALUES
    (1, 'Kummalla yrityksellä on paremmat bileet?'),
    (2, 'Kummalla yrityksellä on innovatiivisemmat työskentelytavat?'),
    (3, 'Kummalla yrityksellä on korkeammat palkat?'),
    (4, 'Kummalla yrityksellä on parempi imago?'),
    (5, 'Kummalla yrityksellä on viihdyttävämpi sosiaalisen median preesenssi?'),
    (6, 'Kumpi yritys tuottaa parempaa koodia?'),
    (7, 'Kumpi yritys tuottaa parempaa designia?'),
    (8, 'Kummassa yrityksessä haluaisit mieluummin työskennellä?'),
    (9, 'Kumpi yritys on kansainvälisempi?'),
    (10, 'Kummalla yrityksellä on siistimpi toimisto?'),
    (11, 'Kumman yrityksen työntekijät ovat enemmän ylpeitä siitä mitä tekevät?'),
    (12, 'Kummalla yrityksellä on parempi tiimityö-kulttuuri?'),
    (13, 'Kumpi yritys tarjoaa paremman mahdollisuuden kehittyä?'),
    (14, 'Kumpi yritys on luotettavampi kumppani IT-projekteissa?'),
    (15, 'Kummalla yrityksellä on kovempaa DevOps-osaamista?'),
    (16, 'Kummassa yrityksessä pääsisit enemmän vaikuttamaan työsi sisältöön?')
ON CONFLICT (id) DO UPDATE
  SET text = excluded.text;
