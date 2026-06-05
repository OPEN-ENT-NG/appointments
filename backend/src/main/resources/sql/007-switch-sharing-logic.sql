-- 1. Insert dans appointments.groups (id = valeur extraite, name = null)
INSERT INTO appointments.groups (id, name)
SELECT DISTINCT TRIM(elem) AS id, NULL AS name
FROM appointments.grid g,
     LATERAL unnest(
        string_to_array(regexp_replace(g.target_public_list_id, '^\[|\]$', '', 'g'), ',')
    ) AS elem
WHERE g.target_public_list_id IS NOT NULL AND g.target_public_list_id <> '[]';

-- 2 Insert dans appointments.grid_shares
INSERT INTO appointments.grid_shares (member_id, resource_id, action)
SELECT
    TRIM(elem) AS member_id,
    g.id AS resource_id,
    'fr-openent-appointments-controller-MainController|initBookResourceRight'
FROM appointments.grid g,
    LATERAL unnest(
        string_to_array(regexp_replace(g.target_public_list_id, '^\[|\]$', '', 'g'), ',')
    ) AS elem
WHERE g.target_public_list_id IS NOT NULL AND g.target_public_list_id <> '[]';

-- 3 Remove now unused column target_public_list_id
ALTER TABLE appointments.grid DROP COLUMN target_public_list_id;