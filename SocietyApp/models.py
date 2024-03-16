from django.db import models

# Create your models here.
# class Investment(models.Model):
#     name = models.CharField(max_length=100)
#     parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

#     def __str__(self):
#         return self.name


from django.db import models

# class Assets(models.Model):
#     INVESTMENT_TYPES = [
#         ('fixed_assets', 'Fixed Assets'),
#         ('investment', 'Investment'),
#         ('misc_assets', 'Misc Assets'),
#     ]

#     asset_name = models.CharField(max_length=100, choices=INVESTMENT_TYPES)

#     def __str__(self):
#         return self.asset_name

# class Childs(models.Model):
#     name = models.CharField(max_length=100)
#     parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
#     asset_type = models.ForeignKey(Assets, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name

class Childs(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    
    def __str__(self):
        return self.name

    def get_full_investment_name(investment):
        full_name = investment.name
        current_parent = investment.parent
        
        while current_parent is not None:
            full_name = f"{current_parent.name} > {full_name}"
            current_parent = current_parent.parent
        
        return full_name

    def get_hierarchy(self, depth=0, is_child=False):
        if is_child:
            prefix = "|--"
        else:
            prefix = ""
        hierarchy = [prefix + self.name]
        if self.children.exists():
            for child in self.children.all():
                hierarchy.extend(child.get_hierarchy(depth + 1, is_child=True))
        return hierarchy

class Assets(models.Model):
    INVESTMENT_TYPES = [
        ('fixed_assets', 'Fixed Assets'),
        ('investment', 'Investment'),
        ('misc_assets', 'Misc Assets'),
    ]

    asset_name = models.CharField(max_length=100, choices=INVESTMENT_TYPES)
    childs = models.ManyToManyField(Childs)

    def get_hierarchy(self, depth=0, is_child=False):
        if is_child:
            prefix = "|--"
        else:
            prefix = ""
        hierarchy = [prefix + self.asset_name]
        for child in self.childs.all():
            hierarchy.extend(child.get_hierarchy(depth + 1, is_child=True))
        return hierarchy

    def written_by(self):
        return ", ".join([str(p) for p in self.childs.all()])

    # def __str__(self):
    #     return self.asset_name


# Get top-level parent objects
# top_level_assets = Assets.objects.filter(childs__parent=None)

# # Loop over the top-level parent objects and print hierarchy for each
# for asset in top_level_assets:
#     print(asset.asset_name)
#     hierarchy = asset.get_hierarchy()
#     for item in hierarchy:
#         print("--", item)




# def get_all_child_investments(parent):
#     all_childs = []
#     def traverse_children(investment):
#         children = investment.children.all()
#         if children:
#             print("çhildren->", children)
#             for child in children:
#                 print("child==>", child)
#                 all_childs.append(child)
#                 traverse_children(child)
#     traverse_children(parent)
#     return "all_childs"






# def get_all_child_investments(parent):
#     def traverse_children(investment, depth=0, show=""):
#         children = investment.children.all()
#         if children:
#             for child in children:
#                 show += f" {'---' * depth}, {child}"
#                 show = traverse_children(child, depth + 1, show)
#         return show
#     return traverse_children(parent)