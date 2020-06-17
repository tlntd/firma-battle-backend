INSERT INTO company (id, name, location, employees, industry, logo) VALUES
    (1, 'Accenture','Helsinki','1400','Konsultointi','accenture.png'),
    (2, 'Capgemini','Espoo, Lappeenranta','3000','Konsultointi, Ylläpito','capgemini.jpg'),
    (3, 'CGI','Helsinki, Tampere, Turku, Oulu','3200','Konsultointi','cgi.png'),
    (4, 'Citrus','Helsinki','40','Konsultointi, SaaS','citrus.png'),
    (5, 'Codemate','Helsinki, Oulu','80','Konsultointi','codemate.png'),
    (6, 'Codento','Helsinki','40','Konsultointi','codento.jpg'),
    (7, 'Columbia Road','Helsinki, Stockholm','50','Konsultointi','columbia-road.png'),
    (8, 'Digia','Helsinki, Oulu, Turku, Tampere','1000','Konsultointi, SaaS','digia.png'),
    (9, 'Digitalist','Helsinki, Jyväskylä, Oulu, Tampere','250','Konsultointi','digitalist.jpg'),
    (10, 'Eficode','Helsinki, Tampere','200','Konsultointi','eficode.png'),
    (11, 'Exove','Helsinki, Oulu, Tampere','90','Konsultointi','exove.png'),
    (12, 'F-Secure','Helsinki','1000','Tietoturva, SaaS','f-secure.png'),
    (13, 'Fraktio','Helsinki','40','Konsultointi','fraktio.jpg'),
    (14, 'Frantic','Helsinki','100','Konsultointi','frantic.jpg'),
    (15, 'Frosmo','Helsinki, Stockholm, London','300','Tuotetalo','frosmo.png'),
    (16, 'Futurice','Helsinki, Tampere, Berlin, London','500','Konsultointi','futurice.png'),
    (17, 'Geniem','Helsinki, Tampere','50','Konsultointi','geniem.png'),
    (18, 'Gofore','Helsinki, Jyväskylä, Tampere','400','Konsultointi','gofore.png'),
    (19, 'HiQ','Espoo, Helsinki','300','Konsultointi','hiq.png'),
    (20, 'Houston Inc.','Helsinki, Turku','80','Konsultointi','houston-inc.jpg'),
    (21, 'Zure','Helsinki','30','Konsultointi','zure.jpg'),
    (22, 'Leonidas','Tampere','40','Konsultointi','leonidas.png'),
    (23, 'Netlight Consulting','Helsinki','800','Konsultointi','netlight-consulting.png'),
    (24, 'Nitor','Helsinki','170','Konsultointi','nitor.png'),
    (25, 'Nordcloud Solutions','Helsinki, Jyväskylä','250','Konsultointi','nordcloud.png'),
    (26, 'Reaktor','Helsinki, Turku, Amsterdam, New York, Tokyo','500','Konsultointi','reaktor.png'),
    (27, 'Relex Solutions','Helsinki','450','Tuotetalo','relex.png'),
    (28, 'Remedy','Espoo','150','Gaming Company','remedy.png'),
    (29, 'Sievo','Helsinki','50+','Tuotetalo','sievo.jpg'),
    (30, 'Siili','Helsinki, Oulu, Seinäjoki','550','Konsultointi','siili.png'),
    (31, 'Sofokus','Helsinki, Turku','60','Konsultointi','sofokus.png'),
    (32, 'Solita','Helsinki, Oulu, Tampere','650','Konsultointi','solita.png'),
    (33, 'Supercell','Helsinki','170','Gaming Company','supercell.jpg'),
    (34, 'Tieto','Helsinki, Tampere, Kuopio, Oulu','14000','Konsultointi','tieto.jpg'),
    (35, 'Unikie','Helsinki, Oulu, Tampere, Turku','60','Konsultointi','unikie.jpg'),
    (36, 'UpCloud','Helsinki','20','Tuotetalo, IaaS','upcloud.jpg'),
    (37, 'Vincit','Helsinki, Tampere, Turku','450','Konsultointi','vincit.png'),
    (38, 'Visma Solutions','Helsinki, Lappeenranta','190','Tuotetalo','visma.png'),
    (39, 'Wolt','Helsinki','30','Konsultointi','wolt.png'),
    (40, 'Wunder','Helsinki, Turku','70','Konsultointi','wunder.png'),
    (41, 'Wunderdog','Helsinki','80','Konsultointi','wunderdog.png'),
    (42, 'Varjo','Helsinki','200','Tuotetalo','varjo.png'),
    (43, 'New Things Co','Helsinki','15','Konsultointi','new-things-co.png'),
    (44, 'Cloud2','Helsinki','20','Konsultointi','cloud2.png'),
    (45, 'Luoto Company','Helsinki','40','Konsultointi','luoto-company.jpg'),
    (46, 'Teamit','Helsinki','50','Konsultointi','teamit-group.png'),
    (47, 'Sysart', 'Helsinki', 'xx', 'Konsultointi', 'sysart.jpg'),
    (48, 'Mavericks', 'Helsinki', '21', 'Konsultointi', 'mavericks.png')
ON CONFLICT (id) DO UPDATE
  SET name      = excluded.name,
      location  = excluded.location,
      employees = excluded.employees,
      industry  = excluded.industry,
      logo      = excluded.logo;
