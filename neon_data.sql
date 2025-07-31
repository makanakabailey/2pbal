--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.users VALUES (1, 'mkanakabailey@gmail.com', '$2b$12$uMYNiTcFhM.JI0cjDqdv3.ieZzwYv3blPNMjZH1kQPDV9nyr4Mu9a', 'Admin', 'User', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, true, true, 'admin', NULL, true, '{"theme": "light", "language": "en", "timezone": "UTC", "notifications": true}', NULL, '2025-07-31 22:11:59.972', '2025-07-31 22:04:55.743319', '2025-07-31 22:05:10.747');


--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.activity_logs VALUES (1, 1, NULL, 'GET /api/auth/me', NULL, NULL, NULL, '172.31.112.162', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '2025-07-31 22:12:00.782014');
INSERT INTO public.activity_logs VALUES (2, 1, NULL, 'GET /api/admin/users', NULL, NULL, NULL, '172.31.112.162', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '2025-07-31 22:12:01.166126');
INSERT INTO public.activity_logs VALUES (3, 1, NULL, 'GET /api/admin/activity-logs', NULL, NULL, NULL, '172.31.112.162', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '2025-07-31 22:12:01.407326');


--
-- Data for Name: email_verifications; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- Data for Name: user_projects; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--



--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.user_sessions VALUES ('a69505ae04eb9200c7c1e58fe968c62eb4acab1a9b40be9741594b56953f9f11', 1, '2025-08-07 22:12:00.102', '2025-07-31 22:12:00.158544');


--
-- Name: activity_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.activity_logs_id_seq', 3, true);


--
-- Name: email_verifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.email_verifications_id_seq', 1, false);


--
-- Name: invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.invoices_id_seq', 1, false);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.quotes_id_seq', 1, false);


--
-- Name: subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.subscriptions_id_seq', 1, false);


--
-- Name: user_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_projects_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

