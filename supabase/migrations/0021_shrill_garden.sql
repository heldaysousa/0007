/*
  # Sample Team Data Migration

  1. Sample Data
    - Professional profiles with varied commission rates
    - Service assignments with custom rates
    
  2. Data Structure
    - Realistic names and contact info
    - Varied commission rates
    - Different service specializations
*/

-- Insert sample professionals
INSERT INTO professionals (id, owner_id, name, phone, commission_rate, active)
SELECT 
  gen_random_uuid(),
  auth.uid(),
  name,
  phone,
  commission_rate,
  true
FROM (
  VALUES 
    ('Andréia Silva', '(11) 98765-4321', 40.00),
    ('Mariana Santos', '(11) 98765-4322', 35.00),
    ('Carolina Oliveira', '(11) 98765-4323', 45.00),
    ('Beatriz Costa', '(11) 98765-4324', 38.00)
) AS t(name, phone, commission_rate)
WHERE EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid());

-- Link professionals to services with custom commission rates
INSERT INTO professional_services (professional_id, service_id, commission_rate)
SELECT 
  p.id,
  s.id,
  CASE 
    WHEN p.name = 'Andréia Silva' THEN 45.00
    WHEN p.name = 'Mariana Santos' THEN 40.00
    WHEN p.name = 'Carolina Oliveira' THEN 50.00
    ELSE 42.00
  END
FROM professionals p
CROSS JOIN services s
WHERE p.owner_id = auth.uid()
  AND s.owner_id = auth.uid()
  AND p.name IN ('Andréia Silva', 'Mariana Santos', 'Carolina Oliveira', 'Beatriz Costa')
ON CONFLICT (professional_id, service_id) DO NOTHING;
