# Contrail_CRUD_DEMO
A CRUD UI demo built with jQuery/jQuery.validate, BootStrap and KnockoutJS

This demo enables basic CRUD operantions at all three levels (cluster, server and interface). A basic validation mechanism is implemented to make sure rules defined in the JSON Schema can be fullfilled. As a pure UI demo, no server calls are actually made. All request data is output to the browser's console.

Due to time limit of the initial implementation, this demo is still flawed. Some obvious improvements can be found in *To DO* section.

## JSON Schema
```json
  {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "http://opencontrail.org",
    "type": "object",
    "properties": {
        "cluster": {
            "id": "http://opencontrail.org/cluster",
            "type": "object",
            "properties": {
                "id": {
                    "id": "http://opencontrail.org/cluster/id",
                    "type": "string"
                },
                "email": {
                    "id": "http://opencontrail.org/cluster/email",
                    "type": "string",
                    "format": "email"
                },
                "password": {
                    "id": "http://opencontrail.org/cluster/password",
                    "type": "string"
                },
                "status": {
                    "id": "http://opencontrail.org/cluster/status",
                    "type": "boolean"
                },
                "servers": {
                    "id": "http://opencontrail.org/cluster/servers",
                    "type": "array",
                    "items": {
                        "id": "http://opencontrail.org/cluster/servers/0",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "http://opencontrail.org/cluster/servers/0/id",
                                "type": "string"
                            },
                            "role": {
                                "id": "http://opencontrail.org/cluster/servers/0/role",
                                "type": "string",
                                "enum": ["config", "control", "openstack", "webui"]
                            },
                            "memory_gb": {
                                "id": "http://opencontrail.org/cluster/servers/0/memory_gb",
                                "type": "integer",
                                "minimum": 0,
                                "default": 256
                            },
                            "tags": {
                                "id": "http://opencontrail.org/cluster/servers/0/tags",
                                "type": "array",
                                "items": {
                                    "id": "http://opencontrail.org/cluster/servers/0/tags/2",
                                    "type": "string"
                                }
                            },
                            "installed_image": {
                                "id": "http://opencontrail.org/cluster/servers/0/installed_image",
                                "type": "string"
                            },
                            "interfaces": {
                                "id": "http://opencontrail.org/cluster/servers/0/interfaces",
                                "type": "array",
                                "items": {
                                    "id": "http://opencontrail.org/cluster/servers/0/interfaces/0",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "http://opencontrail.org/cluster/servers/0/interfaces/0/id",
                                            "type": "string"
                                        },
                                        "ip_address": {
                                            "id": "http://opencontrail.org/cluster/servers/0/interfaces/0/ip_address",
                                            "type": "string"
                                        },
                                        "mac_address": {
                                            "id": "http://opencontrail.org/cluster/servers/0/interfaces/0/mac_address",
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "id",
                                        "ip_address"
                                    ]
                                }
                            },
                            "management_interface": {
                                "id": "http://opencontrail.org/cluster/servers/0/management_interface",
                                "type": "string"
                            }
                        },
                        "required": [
                            "id",
                            "memory_gb",
                            "interfaces",
                            "management_interface"
                        ]
                    }
                }
            },
            "required": [
                "id",
                "status",
                "servers"
            ]
        }
    },
    "required": [
        "cluster"
    ]
  }
```
## To-Do
1. Add routing system using Backbone.js.
   The lack of routing system causes this SPA not linkable and sharable.

2. Refactor templates and introduce better templating system.
   Current implementation takes advantage of KnockoutJS's template binding. But, this templating system introduces large amount of redundent code on the page. By introducing a new templating system, the page can become cleaner and leaner.

   During the development, the three different levels of models are sharing similar view layout. In theory, these there view layouts can use one template by parameterizing and abstracting out the differences (html attributes and inner html differences). On the JavaScript code side, the three view models has shared a lot of common properties and methods by inhereting from one base class. But, after introducing the validation logic, extra shared code snippets were observed which is cause duplication for the time being. This can be addressed possibly by adding top-level utility methods or anther helper class.

3. Update mechanism of communication between ancesters and decendants during validtion.
   In current implementation, in some senario, validation in decendants will cause their ancesters to run validation. This hurts performance when the model growns larger.

4. Add task runner, CSS preprocessor, unit-testing and documentation.
   There's no task runner, CSS preprocessor and testing runner used in this developement yet. By adding task runner (such as Gulp) and unit-testing framework (such as Jasmine), better code quality can be guaranteed. Also, based on the task runner, CSS processor (such as SASS) can make the CSS more maintainable and documentation (such as JSdoc) can also improve the maintainability of JS code.