

## **Informe de Requisitos para el Ambiente en AWS**

**Versión del Documento:** 1.0.0  
**Fecha:** 11 de Noviembre de 2024  
**Responsable:** Francisco Jimenez

### **Objetivo**
Desarrollar un entorno en AWS para Ultratech, basado en una arquitectura contenerizada enfocada en microservicios. Este ambiente utilizará servicios de AWS para despliegue, monitoreo, almacenamiento y bases de datos, integrando capacidades de escalabilidad y seguridad.

> **Nota:** Todos los nombres de recursos, subredes, zonas de disponibilidad, IPs y configuraciones especificadas en este informe son de ejemplo y deberán ajustarse a los valores reales requeridos para el ambiente de producción, desarrollo, QA u otros.

---

### **1. Diseño de Arquitectura**
La arquitectura se implementará en contenedores usando un clúster EKS (Elastic Kubernetes Service) para el despliegue y orquestación de servicios. Este clúster cuenta con autoscaling para ajustar los recursos según las demandas de la carga de trabajo.

### **2. Recursos Necesarios**

#### **2.1 Red y VPC**
- **VPC (Virtual Private Cloud):**
  - VPC: `thv-vpc-01` (Ejemplo)
  - **Subnets Públicas y Privadas** en varias zonas de disponibilidad.
  - **Tablas de enrutamiento** pública y privada conectadas a un Internet Gateway y un NAT Gateway.

#### **2.2 Roles IAM**
- Roles específicos para gestionar permisos y acceso seguro a:
  - EKS, ECR, S3, CloudWatch, ELB, y RDS.

#### **2.3 EKS (Elastic Kubernetes Service)**
- **Clúster EKS** para orquestación de contenedores.

#### **2.4 ECR (Elastic Container Registry)**
- **Repositorio ECR** para almacenamiento de imágenes de contenedores.

#### **2.5 S3 (Simple Storage Service)**
- **Bucket S3** para almacenamiento de archivos, registros y respaldos.

#### **2.6 ELB (Elastic Load Balancer)**
- **Load Balancer** para distribuir tráfico de red hacia el clúster EKS.

#### **2.7 EFS (Elastic File System)**
- **Sistema de archivos EFS** para almacenamiento compartido accesible desde el clúster EKS.

#### **2.8 CloudWatch**
- **CloudWatch** para monitoreo de logs y métricas de desempeño.

#### **2.9 RDS (Relational Database Service)**
- **Clúster de RDS** de SQL Server con instancias distribuidas en múltiples zonas de disponibilidad.

---

### **3. Definición de Segmentos de Red**
- **Subnets públicas y privadas** en distintas zonas de disponibilidad, con sus correspondientes rangos de IPs (Netmask) y tablas de enrutamiento.

### **4. Enrutamiento**
- **Tablas de enrutamiento pública y privada**, conectadas a un Internet Gateway y un NAT Gateway, respectivamente.

---

### **5. Recomendaciones**
- **Seguridad:** Configurar políticas de seguridad estrictas en IAM para garantizar que solo los servicios y usuarios necesarios tengan acceso a los recursos.
- **Escalabilidad:** Configurar el autoscaling en EKS y habilitar las métricas de CloudWatch para monitorear el rendimiento y ajustarlo según sea necesario.
- **Respaldo:** Configurar snapshots automáticos para las bases de datos en RDS y almacenamiento en S3 para respaldos adicionales.

---

### **Listado de Recursos AWS Requeridos**

- VPC
- Subnets (Públicas y Privadas)
- Internet Gateway
- NAT Gateway
- IAM Roles
- Elastic Kubernetes Service (EKS)
- Elastic Container Registry (ECR)
- Simple Storage Service (S3)
- Elastic Load Balancer (ELB)
- Elastic File System (EFS)
- CloudWatch
- Relational Database Service (RDS)

