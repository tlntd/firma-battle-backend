INSERT INTO question (id, text, "pluralText") VALUES
    (1, 'Kummalla yrityksellä on paremmat bileet?', 'Millä yrityksellä on parhaat bileet?'),
    (2, 'Kummalla yrityksellä on innovatiivisemmat työskentelytavat?', 'Millä yrityksellä on innovatiivisimmat työskentelytavat?'),
    (3, 'Kummalla yrityksellä on korkeammat palkat?', 'Millä yrityksellä on korkeimmat palkat?'),
    (4, 'Kummalla yrityksellä on parempi imago?', 'Millä yrityksellä on paras imago?'),
    (5, 'Kummalla yrityksellä on viihdyttävämpi sosiaalisen median preesenssi?', 'Millä yrityksellä on viihdyttävin sosiaalisen medinan preesens?'),
    (6, 'Kumpi yritys tuottaa parempaa koodia?', 'Mikä yritys tuottaa parasta koodia?'),
    (7, 'Kumpi yritys tuottaa parempaa designia?', 'Mikä yritys tuottaa parasta designia?'),
    (8, 'Kummassa yrityksessä haluaisit mieluummin työskennellä?', 'Missä yrityksessä haluaisit mieluiten työskennellä?'),
    (9, 'Kumpi yritys on kansainvälisempi?', 'Mikä yritys on kansainvälisin?'),
    (10, 'Kummalla yrityksellä on siistimpi toimisto?', 'Millä yrityksellä on siistein toimisto?'),
    (11, 'Kumman yrityksen työntekijät ovat enemmän ylpeitä siitä mitä tekevät?', 'Minkä yrityksen työntekijät ovat enemmän ylpeitä siitä mitä tekevät?'),
    (12, 'Kummalla yrityksellä on parempi tiimityö-kulttuuri?', 'Millä yrityksellä on paras tiimityö-kulttuuri?'),
    (13, 'Kumpi yritys tarjoaa paremman mahdollisuuden kehittyä?', 'Mikä yritys tarjoaa parhaimmat mahdollisuuden kehittyä?'),
    (14, 'Kumpi yritys on luotettavampi kumppani IT-projekteissa?', 'Mikä yritys on luotettavin kumppani IT-projekteissa?'),
    (15, 'Kummalla yrityksellä on kovempaa DevOps-osaamista?', 'Millä yrityksellä on kovinta DevOps-osaamista?'),
    (16, 'Kummassa yrityksessä pääsisit enemmän vaikuttamaan työsi sisältöön?', 'Missä yrityksessä pääsisit eniten vaikuttamaan työsi sisältöön?')
ON CONFLICT (id) DO UPDATE
  SET text = excluded.text,
      "pluralText" = excluded."pluralText";
